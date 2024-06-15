import { NextResponse } from "next/server";
import prisma from "@/db";
import axios, { AxiosResponse } from "axios";

type OpenAIChoicesResponse = {
    message: MessageProps;
};

type OpenAIResponse = {
    choices: OpenAIChoicesResponse[];
};

export type MessageProps = {
    role: string;
    content: string;
};

export async function POST(request: Request) {
    try{
        const apiKey = process.env.OPENAI_API_KEY;
        const {chatSessionId, content} = await request.json()
        
        let chatSession:any;
        if(!chatSessionId){
            chatSession = await prisma.chatSession.create({
                data:{
                    // TODO: Change it to something searchable
                    name: content
                },
            })
        }else{
            chatSession = await prisma.chatSession.findFirst({
                where: {id: chatSessionId},
                include: {messages: true}
            })
        }

        const newMessages: any = [...(chatSession?.messages ?? [])]
        newMessages.push({
            role: "user",
            content,
            chatSessionId: chatSession.id
        });


        // AI Processing
        const response: AxiosResponse<OpenAIResponse> = await axios.post(
            // `${process.env.OPENAI_API_URL}/completions`,
            `https://api.openai.com/v1/chat/completions`,
            {
                messages: newMessages,
                model: "gpt-3.5-turbo",
                stream: false, // So it come in complete form not word by word
            },
            {
                headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                },
            }
        );

        const data = response.data;
        newMessages.push({
            ...data.choices[0].message,
            chatSessionId: chatSession.id
        });

        await prisma.message.createMany({
            data: newMessages
        })

        console.log("TEST3")
        
        return NextResponse.json({
            message:"Success",
            data: newMessages            
        }, {status: 200})

    }catch(error){
        
        return NextResponse.json({
            message: "Internal Server Error", 
            error
        }, {status: 500})
    }
}
"use client"
import { Card, CardContent } from "@/components/ui/card";
import { FaEnvelope } from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay'


const messages = [
  {
    title: "Mystery Guest",
    content:
      "Welcome to the mystery guest chat! We'll be discussing various topics and seeking anonymous feedback. Enjoy your stay!",
    time: "20 seconds ago",
  },
  {
    title: "Tailwind walker",
    content: "Welcome to this amazing chating system",
    time: "3 hours ago",
  },
  {
    title: "Magic Terrifier",
    content: "Are you a ghost?",
    time: "1 day ago",
  },
];


export default function WelcomePage() {

  return (
    <div className="flex-grow" >
      <div className="mt-16 p-10">
        <h2 className="text-4xl text-center font-extrabold">
          Dive into the world of Anonymous Feedback
        </h2>
        <p className="text-xs text-slate-200 text-center">
          True Feedback - Where your identity remains a secret!🤫
        </p>
      </div>
      <div className="flex justify-center">
        <Carousel plugins={[Autoplay({delay:3000})]} >
          <CarouselContent >
            {messages.map((item, index) => (
              <CarouselItem key={index}>
                <div className="flex justify-center py-6 px-20" >
                  <Card className="w-1/2" >
                    <CardContent className="space-y-2" >
                      <h3 className="text-xl mt-3 mb-3" >Message from {item.title}</h3>
                      <div className="flex gap-2 " >
                        <div className="p-2 flex justify-center" >
                          <FaEnvelope size={23} />
                        </div>
                        <div>
                          <p>{item.content}</p>
                          <p className=" opacity-50" >{item.time}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/* <Carousel>
          <CarouselItem>
          <EmblaCarousel slides={messages} options={OPTIONS} />
          </CarouselItem>
        </Carousel> */}
      </div>
    </div>
  );
}

import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import React from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Contact - Note-orious Web App" },
    { name: "description", content: "Welcome to Note-orious Web App!" },
  ];
};

const Contact = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 my-24 xl:my-0 min-h-full lg:h-screen w-full">
      <div className="flex flex-col justify-center items-start gap-4 w-[90%] lg:max-w-[1280px]">
        <h1 className="font-roboto font-extrabold text-3xl md:text-4xl lg:text-6xl text-[#262626]">
          Contact <b className="text-yellow-500">Us</b>
        </h1>
        <p className="font-roboto text-md md:text-lg lg:text-2xl text-[#262626] text-justify">
          Have questions or feedback about{" "}
          <b className="text-yellow-500">Note-orious</b>? We’re here to help and
          always eager to hear your ideas to make our app even better.
        </p>
      </div>
      <br />
      <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-10 md:gap-20 w-[90%] lg:max-w-[1280px]">
        <div className="w-full md:w-[60%] lg:w-[50%]">
          <div>
            <Label>Name</Label>
            <Input type="text" placeholder="Your Name" />
            <br />
            <Label>Email Address</Label>
            <Input type="email" placeholder="Your Email Address" />
            <br />
            <Label>Email Address</Label>
            <Textarea placeholder="Your Message..." />
            <br />
            <Button className="bg-yellow-500 w-full">Send</Button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 w-full lg:w-[50%]">
          <h1 className="font-roboto text-xl md:text-2xl lg:text-3xl font-extrabold">
            Contact Information
          </h1>
          <p className="font-roboto font-bold text-lg md:text-xl lg:text-2xl text-gray-400 text-center">
            Email: support@note-orious.com.ph
          </p>
          <br />
          <ul className="flex justify-center items-center gap-4 w-full">
            <li>
              <Link to={""} target="_blank">
                <FaFacebookSquare className="text-4xl hover:text-blue-900" />
              </Link>
            </li>
            <li>
              <Link to={""} target="_blank">
                <FaLinkedin className="text-4xl hover:text-blue-600" />
              </Link>
            </li>
            <li>
              <Link to={""} target="_blank">
                <FaGithubSquare className="text-4xl hover:text-gray-800" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;

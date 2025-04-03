import React from "react";
import "../css/banner.css"; 
import { Building2, ChevronRight, GraduationCap, Search } from "lucide-react"
import { Button } from "@ui/components/ui/button"
import { Input } from "@ui/components/ui/input"
// import 
import {IntroVideo, Logo} from "@repo/assets";

const Hero = () => {
    return (
        <div className="banner">
            <video autoPlay loop muted className="banner-video text-red-500">
                <source src={IntroVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <img src={Logo} alt="logo" />
            <h1 className="tagline">Connecting Hearts, Changing Lives</h1>
        </div>
    );

    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-accent-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-secondary-500">
              Launch Your Career Journey Today
            </h1>
            <p className="max-w-[600px] text-secondary-600 md:text-xl">
              Connect with top employers, discover internships, and land your dream job. The #1 career platform for
              students and recent graduates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
                <Input
                  type="text"
                  placeholder="Search jobs, internships..."
                  className="pl-10 pr-4 py-6 rounded-full border-accent-200 focus-visible:ring-highlight"
                />
              </div>
              <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-8">
                Search
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-secondary-500 mt-2">Join over 10 million students from 1,400+ schools</p>
          </div>
          <div className="mx-auto lg:mr-0 relative">
            <div className="relative h-[400px] w-[400px]">
              <img
                src={"/placeholder.svg?height=400&width=400"}
                alt="Students using CareerConnect"
                width={400}
                height={400}
                className="rounded-2xl object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center gap-2">
                <div className="bg-accent-100 p-2 rounded-full">
                  <Building2 className="h-5 w-5 text-accent-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary-500">150,000+</p>
                  <p className="text-xs text-secondary-400">Employers</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center gap-2">
                <div className="bg-highlight-100 p-2 rounded-full">
                  <GraduationCap className="h-5 w-5 text-highlight" />
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary-500">10M+</p>
                  <p className="text-xs text-secondary-400">Students</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
};

export default Hero;
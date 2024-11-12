import React from 'react'
import {FaArrowRight} from "react-icons/fa"
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import Footer from "../components/common/Footer"


const Home = () => {
  return (
    <div>
        {/* Section 1 */}
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center
         text-white justify-between gap-8'>

            <Link to={"/signup"}>
 
                <div data-aos="zoom-in" className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                transition-all duration-200 hover:scale-95 w-fit 
                box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset; hover:drop-shadow-none'>
                    <div className='flex flex-row items-center gap-[10px] rounded-full 
                    px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight/> 
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold '>
                Empower Your Future with 
                <HighlightText text={"Coding Skills"}/>
            </div>

            <div className='w-[68%] text-center font-bold text-richblack-300 text-base mx-auto'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className='flex flex-row gap-7'>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>

                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>

            <div className='shadow-blue-200 mx-3 my-7 shadow-[10px_-5px_50px_-5px]'>
                <video className='shadow-[20px_20px_rgba(255,255,255)]'
                muted
                loop
                autoPlay>
                    <source src={Banner} type='video/mp4'/>
                </video>
            </div>

            {/* Code Section 1 */}
            <div>
                <CodeBlocks
                    position={"lg:flex-row flex-col"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock Your
                            <HighlightText text={"coding potential "}/>
                            with our online courses
                        </div>
                    }
                    subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    ctabtn1={
                        {
                            btnText:"try it yourself",
                            linkto:"/signup",
                            active:true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText:"Learn more",
                            linkto:"/login",
                            active:false,
                        }
                    }

                    codeblock={`<!DOCTYPE html>
                        <html>
                        head><title>Example</
                        title><linkrel="stylesheet"href="styles.css">
                        /head>
                        body>
                        h1><ahref="/">Header</a>
                        /h1>
                        nav><ahref="one/">One</a><ahref="two/">Two</
                        a><ahref="three/">Three</a>
                        /nav>`}     

                    codeColor={"text-yellow-25"}  

                    backgroudGradient={<div className="codeblock1 absolute"></div>}
                />
            </div>

            {/* code Section 2 */}
            <div>
                <CodeBlocks
                    position={"lg:flex-row-reverse flex-col"}
                    heading={
                        <div className='text-4xl font-semibold lg:w-[50%]'>
                            Start <HighlightText text={"coding"}/>
                            <br/>
                            <HighlightText text={"in seconds "}/>
                        </div>
                    }
                    subheading={
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    ctabtn1={
                        {
                            btnText:"Continue Lesson",
                            linkto:"/signup",
                            active:true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText:"Learn more",
                            linkto:"/login",
                            active:false,
                        }
                    }

                    codeblock={`<!DOCTYPE html>
                        <html>
                        head><title>Example</
                        title><linkrel="stylesheet"href="styles.css">
                        /head>
                        body>
                        h1><ahref="/">Header</a>
                        /h1>
                        nav><ahref="one/">One</a><ahref="two/">Two</
                        a><ahref="three/">Three</a>
                        /nav>`}

                    codeColor={"text-blue-25"}  
                    backgroudGradient={<div className="codeblock2 absolute"></div>}
                />
            </div>
        </div>


        {/* Section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[310px]'>

                <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                    
                    {/* view it */}
                    <div className='lg:h-[150px]'></div>
                    <div className='flex flex-row gap-7 text-white lg:mt-8'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex items-center gap-3'>
                                Explore Full Catalog
                                <FaArrowRight/>
                            </div>
                        </CTAButton>

                        <CTAButton active={false} linkto={"/signup"}>
                            <div>
                                Learn More  
                            </div>
                        </CTAButton>
                    </div>

                </div>

            </div>


            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between
            gap-7'>

                <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
                    <div className='text-4xl font-semibold lg:w-[45%]'>
                        Get the Skills you need for a
                        <HighlightText text={"Job that is in demand"} />
                    </div>

                    <div className='flex flex-col gap-10 lg:w-[40%] items-start '>
                        <div className='text-[16px]'>
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>

                        <CTAButton active={true} linkto={"/signup"}>
                            <div>
                                Learn More
                            </div>
                        </CTAButton>
                    </div>
                </div>

                <TimelineSection />

                <LearningLanguageSection />
            </div>
        </div>

        {/* Section 3 */}

        <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
            <InstructorSection />

            <h2 className='text-center text-4xl font-semibold mt-10'>Review from other learners</h2>
        </div>

        {/* Footer */}
        <Footer />
    </div>
  )
}

export default Home
import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { useSelector } from "react-redux"
import Error from "./Error"


const Catalog = () => {

  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  
  useEffect(() => {
    const getCategories = async () => {
      try {
          const res = await apiConnector("GET", categories.CATEGORIES_API);
          const category_id = res?.data?.data?.categories?.find((ct) => 
              ct.name.split(" ").join("-").toLowerCase() === catalogName
          )?._id;
          console.log("category_id", category_id);
          setCategoryId(category_id);
      } catch (error) {
          console.error("Error fetching categories:", error);
      }
     };
  
    getCategories();
  },[catalogName])

  useEffect(() => {
    const getCategoryDetails = async () => { 
        try {
            console.log("category_id", categoryId);
            const res = await getCatalogaPageData(categoryId);
            console.log("printing ress", res);
            setCatalogPageData(res);
        } catch (error) {
            console.log("error in getCatalogPage", error);
        }
    };

    if (categoryId) {
        getCategoryDetails();
    }
  }, [categoryId]);


  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!loading && !catalogPageData.success) {
    return <Error />
  }
  
  return (
    <div className='text-white'>
      <div className=" box-content bg-richblack-800 px-4">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
              <p className="text-sm text-richblack-300">
                {`Home / Catalog / `}
                <span className="text-yellow-25">
                  {catalogPageData?.data?.selectedCategory?.name}
                </span>
              </p>

              <p className="text-3xl text-richblack-5">
                {catalogPageData?.data?.selectedCategory?.name}
              </p>

              <p className="max-w-[870px] text-richblack-200">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
            </div>
      </div>

      <div>
        <div>
          <div>Courses to get you started</div>
          <div className='flex gap-x-3'>
            <p>Most Popular</p>
            <p>New</p>
          </div>

          <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.name}/>
        </div>

        {/* section 2 */}
        <div>
          <p>Top Courses in {catalogPageData?.data?.selectedCategory?.name}</p>
          <div>
            <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses}/>
          </div>
        </div>

        {/* section 3 */}
        <div>
          <div>Frequently Bought Together</div>
          <div className='py-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
              {
                catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                .map((course,index) => {
                  <Course_Card course={course} key={index} Height={"h-[400px]"} />
                })
              }
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Catalog  
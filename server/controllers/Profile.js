const Profile = require("../models/Profile")
const User = require("../models/User")
const Course = require("../models/Course")
const user = require("../models/User")
const mongoose = require("mongoose")
const { uploadImageToCloudinary } = require("../utils/imageUploader")

exports.updateProfile = async (req, res) => {
    try {
        const {
            firstName = "",
            lastName = "",
            dateOfBirth = "",
            about = "",
            contactNumber = "",
            gender = "",
        } = req.body;
        const id = req.user.id;

        // Find the user by id
        const userDetails = await User.findById(id);
        console.log(" printing userDetails",userDetails);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Find the profile by the user's additionalDetails reference
        const profile = await Profile.findById(userDetails.additionalDetails);
        // console.log("printing profile",profile);
        // if (!profile) {
        //     return res.status(404).json({
        //         success: false,
        //         message: 'Profile not found',
        //     });
        // }

        // Update the user fields
        const user = await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
        }, { new: true }); // { new: true } returns the updated user
        await user.save();

        // Update the profile fields
        console.log("printing profile datebirth");
        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        profile.contactNumber = contactNumber;
        profile.gender = gender;

        // Save the updated profile
        await profile.save();

        // Find the updated user details
        const updatedUserDetails = await User.findById(id)
            .populate("additionalDetails")
            .exec();

        return res.json({
            success: true,
            message: "Profile updated successfully",
            updatedUserDetails,
        });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
 


exports.deleteAccount = async(req,res) => {
    try{

        const id = req.user.id;

        const userDetails = await User.findById({_id: id});

        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:'User not found',
            })
        }

        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        await User.findByIdAndDelete({_id:id}); 

        return res.status(200).json({
            success:true,
            message:'User Deleted SuccessFully',
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User cannont be deleted',
        })
    }
}


exports.getAllUserDetails = async(req,res) => {
    try{
        const id = req.user.id

        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        console.log(userDetails);

        res.status(200).json({
            success:true,
            message:"User Data Fetched SuccessFully",
            data: userDetails,
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )

      console.log(image);

      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )

      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    }
    catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  

exports.getEnrolledCourses = async(req,res) => {
    try{
        const userId = req.user.id
        let userDetails = await User.findOne({
            _id:userId,
        })
        .populate({
            path:"courses",
            populate : {
                path: "courseContent",
                populate: {
                    path:"subSection",
                },
            }
        })
        .exec()


        userDetails = userDetails.toObject();

        var SubsectionLength = 0;

        for(var i=0;i<userDetails.courses.length;i++){
            let totalDurationInSeconds = 0 
            SubsectionLength = 0
            for(var j = 0;j < userDetails.courses[i].courseContent.length;j++){
                totalDurationInSeconds += userDetails.courses[i].courseContent[j]
                .subsection.reduce((acc,curr) => acc + parseInt(curr.timeDuration),0)

                userDetails.courses[i].totalDuration = convertSecondsToDuration(
                    totalDurationInSeconds
                )

                SubsectionLength += userDetails.courses[i].courseContent[i].subsection.length
            }

            let courseProgressCount = await CourseProgress.findOne({
                courseID: userDetails.courses[i]._id,
                userId: userId,
            })

            courseProgressCount = courseProgressCount ?. completeViedos.length

            if(SubsectionLength == 0){
                userDetails.courses[i].progressPercentage = 100
            }
            else{
                const multiplier = Math.pow(10,2)
                userDetails.courses[i].progressPercentage = Math.round((courseProgressCount / SubsectionLength)*100*multiplier) / multiplier
            }
        }

        if (!userDetails) {
            return res.status(400).json({
              success: false,
              message: `Could not find user with id: ${userDetails}`,
            })
        }

        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


exports.instructorDashboard = async(req, res) => {
	try{
		const courseDetails = await Course.find({instructor:req.user.id});

		const courseData  = courseDetails.map((course)=> {
			const totalStudentsEnrolled = course.studentEnrolled.length
			const totalAmountGenerated = totalStudentsEnrolled * course.price

			//create an new object with the additional fields
			const courseDataWithStats = {
				_id: course._id,
				courseName: course.courseName,
				courseDescription: course.courseDescription,
				totalStudentsEnrolled,
				totalAmountGenerated,
			}
			return courseDataWithStats
		})

		res.status(200).json({courses:courseData});

	}
	catch(error) {
		console.error(error);
		res.status(500).json({message:"Internal Server Error"});
	}
}
import apiError from "./apiError.js";

/**video  from video controller*/
function getVideo(req) {
    /**find thumbnail and video */
    const thumbnail = req.files?.thumbnail?.[0].path;
    const video = req.files?.video?.[0].path;
    console.log(thumbnail,video);
    if (!video) {
        throw new apiError(400,"video is required")
    }
    return {thumbnail,video}

};



export { getVideo }



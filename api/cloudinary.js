// api/cloudinary.js
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = async (req, res) => {
    try {
        const result = await cloudinary.search
            .expression("resource_type:image") // 📌 루트 폴더 전체 검색
            .sort_by("public_id", "desc")
            .max_results(200)
            .execute();

        const urls = result.resources.map((file) => file.secure_url);
        res.status(200).json(urls);
    } catch (err) {
        res.status(500).json({
            error: "Cloudinary fetch failed",
            details: err.message,
        });
    }
};

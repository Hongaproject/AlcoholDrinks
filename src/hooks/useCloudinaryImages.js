import { useEffect, useState } from "react";

export default function useCloudinaryImages(publicIds) {
    const [imageSrc, setImageSrc] = useState(
        new Array(publicIds.length).fill(""),
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

    useEffect(() => {
        try {
            const urls = publicIds.map(
                (id) =>
                    `https://res.cloudinary.com/${cloudName}/image/upload/${id}`,
            );
            setImageSrc(urls);
            setLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            setLoading(false);
        }
    }, [cloudName, publicIds.join(",")]);

    return { imageSrc, loading, error };
}

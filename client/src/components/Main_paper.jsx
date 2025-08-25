import React, { useEffect, useRef } from 'react'

const Main_paper = () => {

    const videoRef = useRef(null);

    const [err, setErr] = React.useState("");
    const [granted, setGranted] = React.useState(false);

    useEffect(() => {
        const EnableStream = async () => {
            try {

                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }

                setGranted(true);
                setErr("");
                return;
            }
            catch (err) {
                console.error("Permission denied: ", err);
                setErr("You must allow Camera & Microphone access to proceed.");
                setGranted(false);
                return;
            }
        }
        EnableStream();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
        
    }, []);

    return (
        <div>Main_paper</div>
    )
}

export default Main_paper
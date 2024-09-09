import React, { useRef, useState } from 'react'
import logo from "../../assets/logo.png";
import { Phone, X } from 'lucide-react';
import main_profile from '../../assets/main_profile.png'
import { io } from "socket.io-client";
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const UserAudioCall = () => {
    const { roomId } = useParams();
    const location = useLocation();
    const offerData = location.state?.offerData;
    const [inCall, setInCall] = useState(false);
    const localStreamRef = useRef();
    const remoteStreamRef = useRef();
    const peerConnectionRef = useRef();
    const socket = useRef();


    useEffect(() => {
        // Initiate socket connection for WebRTC signaling
        socket.current = io("http://127.0.0.1:8000", { transports: ['websocket'], debug: true });
        console.log("WebSocket reference:", socket.current);


        if (offerData) {
            // If offer data is present, handle the received offer
            console.log('the offer data',offerData)
            handleReceivedOffer(offerData.offer);
        }
    
        // Listening for call offer
        socket.current.on("call_user", async ({ from, offer, roomId }) => {
            console.log("Receiving call from:", from);
            await handleReceivedOffer(offer);
        });
    
        // Listening for answer from the peer
        socket.current.on("answer_call", async (answer) => {
            console.log("Received answer from peer:", answer);
            await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
        });
    
        // Listening for ICE candidates
        socket.current.on("ice-candidate", async (candidate) => {
            console.log("Received ICE candidate:", candidate);
            if (candidate) {
                await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
            }
        });
    
        return () => {
            socket.current.disconnect();
        };
    }, [offerData]);
    
    
    const startAudioCall = async () => {
        console.log("Starting audio call...");
        const peerConnection = new RTCPeerConnection();
        peerConnectionRef.current = peerConnection;
    
        const localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        localStreamRef.current = localStream;
    
        localStream.getTracks().forEach((track) => {
            console.log("Adding local audio track to peer connection:", track);
            peerConnection.addTrack(track, localStream);
        });
    
        peerConnection.ontrack = (event) => {
            if (remoteStreamRef.current) {
                const remoteStream = new MediaStream();
                remoteStream.addTrack(event.track);
                remoteStreamRef.current.srcObject = remoteStream;
            } else {
                console.error("Remote stream reference is not set.");
            }
        };
    
        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.current.emit("ice-candidate", { candidate: event.candidate, roomId });
            }
        };
    
        try {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            socket.current.emit("call_user", { offer, roomId, from: shop });
        } catch (error) {
            console.error("Error during offer creation:", error);
        }
    
        setInCall(true);
    };
    
    
    const handleReceivedOffer = async (offer) => {
        if (!offer || !offer.type || !offer.sdp) {
            console.error("Invalid offer received", offer);
            return;
        }
    
        const peerConnection = new RTCPeerConnection();
        peerConnectionRef.current = peerConnection;
    
        const localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        localStreamRef.current = localStream;
    
        localStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, localStream);
        });
    
        peerConnection.ontrack = (event) => {
            if (remoteStreamRef.current) {
                const remoteStream = new MediaStream();
                remoteStream.addTrack(event.track);
                remoteStreamRef.current.srcObject = remoteStream;
            } else {
                console.error("Remote stream reference is not set.");
            }
        };
    
        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.current.emit("ice-candidate", { candidate: event.candidate, roomId: offerData.roomId });
            }
        };
    
        try {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            socket.current.emit("answer_call", { answer, roomId: offerData.roomId });
        } catch (error) {
            console.error("Error handling received offer", error);
        }
    
        setInCall(true);
    };
    
    
    
    const endCall = () => {
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            socket.current.emit("end_call", { roomId });
            peerConnectionRef.current = null;
        }
        setInCall(false);
    };
  return (
    <>
                <div className='flex flex-col items-center bg-myBlack w-full max-w-md max-h-[70vh] p-6 rounded-lg mx-auto mt-10'>
                <div className='flex justify-between items-center w-full mb-4'>
                    <img className='w-12 h-12' src={logo} alt="logo" />
                    <div className='font-bold text-white text-2xl'>Audio Call</div>
                    <div className='p-2 rounded-full hover:bg-gray-700 cursor-pointer'>
                        <X color="#ffffff" />
                    </div>
                </div>

                <div className='flex flex-col items-center justify-center w-full'>
                    <img className='w-24 h-24 rounded-full mb-4' src={main_profile} alt="Profile" />
                    <div className='text-white text-lg mb-4'>User Name</div>
                </div>

                <div className='w-full'>
                    <video
                        ref={remoteStreamRef}
                        autoPlay
                        muted
                        className='w-full h-auto bg-myBlack'
                    />
                </div>

                <div className='mt-auto'>
                    <div className='bg-red-500 p-4 rounded-full hover:bg-red-600 cursor-pointer '>
                        <Phone size={24} color="#ffffff" />
                    </div>
                </div>
            </div>
    </>
  )
}

export default UserAudioCall
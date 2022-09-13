
import Link from "next/link"
import Cookies from "js-cookie"
import { getAuth, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { googleProvider } from "../utils/authFirebase/providers";
import { useContext } from "react";
import AppContext from "../utils/context";


export default function index() {
    const { setUserAuthed, UserAuthed } = useContext(AppContext)

    const submitMedsos = (provider) => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const formData = new FormData();
                formData.append("accessToken", result.user.accessToken);

                axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, formData).then((res) => {
                    Cookies.set("userProfile",
                        JSON.stringify(res.data.user),
                        { expires: 365 },
                        { secure: true }
                    );
                    Cookies.set("userToken",
                        JSON.stringify(res.data.token),
                        { expires: 365 },
                        { secure: true }
                    );
                    setUserAuthed(res.data.user);
                    window.location.href = "/note";
                })
            })
            .catch((error) => {
                console.clear();
                console.error(error);
            });
    };


    return (
        <div>
            <div className="flex flex-col justify-center items-center" style={{ height: 'calc(100vh - 10rem)' }}>
                <div className="text-center mb-6">
                    <div className="text-4xl">DIGINOTES</div>
                    <div className="text-xl">Easily access your note. anytime-anywhere</div>
                    {/* <div>Your notes will be backed up in the cloud, so you can access them from any device connected to your account</div> */}
                </div>
                {(UserAuthed?.name) ?
                    <Link href='/note'>
                        <a className="btn py-[.65rem] bg-amber-400">List My Note</a>
                    </Link>
                    :
                    <div
                        className="btn-outline text-sm text-gray-500 border-gray-400"
                        style={{ borderRadius: '.2rem' }}
                        onClick={() => submitMedsos(googleProvider)}
                    >
                        <img src="/images/GoogleLogo.png" className="h-[1.2rem] mb-[.1rem]" alt="google" />
                        <div>Sign in account</div>
                    </div>
                }
            </div>
        </div>
    )
}

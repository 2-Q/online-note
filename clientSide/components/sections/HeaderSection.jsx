import Link from "next/link";
import { useContext } from "react";
import AppContext from "../../utils/context";
import { useState } from "react";
import { blacklist } from "../../utils/api/crud";



export default function HeaderSection() {
    const { UserAuthed } = useContext(AppContext)
    const [ShowDropDown, setShowDropDown] = useState(false)

    return (
        <header className="border-b">
            <div className="py-3 flex justify-between items-center container">
                <div>
                    <Link href='/' className="text-lg font-light">DIGINOTES</Link>
                </div>
                {(UserAuthed?.name) &&
                    <div>
                        <div className="flex items-center cursor-pointer" onClick={() => setShowDropDown(true)}>
                            <img className="w-8" src="/icons/IconUser.webp" alt="user" />
                            <div className="font-bold">{UserAuthed.name}</div>
                        </div>
                        {ShowDropDown && (
                            <>
                                <div
                                    className="absolute w-screen h-screen inset-0"
                                    onClick={() => { setShowDropDown(false) }}
                                />
                                <div className="absolute card w-[12rem]">
                                    <div
                                        onClick={() => {
                                            const acc = confirm('You really want to logout this account?')
                                            if (acc) {
                                                blacklist()
                                            } else {
                                                setShowDropDown(false)
                                            }
                                        }}
                                        className="card-body flex items-center cursor-pointer gap-1">
                                        <img src="/icons/IconLogout.png" className="w-4" alt="icon logout" />
                                        <span>logout</span>
                                    </div>
                                </div>
                            </>

                        )}
                    </div>
                }
            </div>
        </header>
    )
}
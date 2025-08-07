import React from 'react'
import { Button } from '../ui/button'
import { LogoIcon } from '../icons/LogoIcon'
import { NewChatIcon } from '../icons/NewChatIcon'
import { SearchIcon } from '../icons/SearchIcon'
import { LibraryIcon } from '../icons/LibraryIcon'

type TopSectionProps = {
    handleNewChat: () => void;
}

const TopSection = ({ handleNewChat }: TopSectionProps) => {
    return (
        < div className="p-1 space-y-0 px-2" >
            < div className="flex items-center gap-3 px-3 py-3 pb-6" >
                <LogoIcon className="size-6 text-white" />
            </div >

            <Button
                variant="default"
                className="w-full justify-start text-white hover:bg-[#2f2f2f] rounded-lg h-9"
                onClick={handleNewChat}
            >
                <NewChatIcon className="size-5 mr-0" />
                New chat
            </Button>

            <Button
                variant="default"
                className="w-full justify-start text-white hover:bg-[#2f2f2f] rounded-lg h-9"
            >
                <SearchIcon className="size-5 mr-0" />
                Search chats
            </Button>

            <Button
                variant="default"
                className="w-full justify-start text-white hover:bg-[#2f2f2f] rounded-lg h-9"
            >
                <LibraryIcon className="size-5 mr-0" />
                Library
            </Button>
        </div >
    )
}

export default TopSection
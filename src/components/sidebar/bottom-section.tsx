import React from 'react'
import { Button } from '../ui/button';
import { SettingsIcon } from '@/components/icons/SettingsIcon';

const BottomSection = () => {
    return (
        <div className="p-3 border-t border-[#2f2f2f]">
            <Button
                variant="default"
                className="w-full justify-start text-white hover:bg-[#2f2f2f] rounded-lg p-3"
            >
                <SettingsIcon className="size-5 mr-0" />
                <div className="flex flex-col items-start">
                    <span className="text-sm">Upgrade plan</span>
                    <span className="text-xs text-white">
                        More access to the best models
                    </span>
                </div>
            </Button>
        </div>
    )
}

export default BottomSection;
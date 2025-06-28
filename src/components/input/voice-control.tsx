import { Volume2, VolumeX, MoreVertical, ChevronDown } from "lucide-react";
import { useState } from "react";

const VoiceControlsMenu = () => {
    const [isMuted, setIsMuted] = useState(true);
    const [selectedLanguage, setSelectedLanguage] = useState("en-GB");

    const languages = [
        { value: "en-US", label: "English (US)" },
        { value: "en-GB", label: "English (UK)" },
        { value: "en-AU", label: "English (AU)" },
        { value: "en-IN", label: "English (IN)" },
        { value: "cmn-Hans-CN", label: "普通话 (中国大陆)" },
        { value: "cmn-Hant-TW", label: "中文 (台灣)" },
        { value: "yue-Hant-HK", label: "粵語 (香港)" },
        { value: "id-ID", label: "Bahasa Indonesia" },
        { value: "ms-MY", label: "Bahasa Melayu" },
        { value: "ca-ES", label: "Català" },
        { value: "cs-CZ", label: "Čeština" },
        { value: "da-DK", label: "Dansk" },
        { value: "de-DE", label: "Deutsch" },
        { value: "es-ES", label: "Español (ES)" },
        { value: "es-MX", label: "Español (MX)" },
        { value: "fr-FR", label: "Français" },
        { value: "hr-HR", label: "Hrvatski" },
        { value: "it-IT", label: "Italiano" },
        { value: "hu-HU", label: "Magyar" },
        { value: "nl-NL", label: "Nederlands" },
        { value: "nb-NO", label: "Norsk bokmål" },
        { value: "pl-PL", label: "Polski" },
        { value: "pt-PT", label: "Português (PT)" },
        { value: "pt-BR", label: "Português (BR)" },
        { value: "ro-RO", label: "Română" },
        { value: "sk-SK", label: "Slovenčina" },
        { value: "fi-FI", label: "Suomi" },
        { value: "sv-SE", label: "Svenska" },
        { value: "tr-TR", label: "Türkçe" },
        { value: "bg-BG", label: "български" },
        { value: "ja-JP", label: "日本語" },
        { value: "ko-KR", label: "한국어" },
        { value: "ru-RU", label: "Pусский" },
        { value: "vi-VN", label: "Tiếng Việt" },
        { value: "th-TH", label: "ภาษาไทย" },
        { value: "he-IL", label: "עִברִית" },
        { value: "el-GR", label: "Ελληνικά" },
        { value: "ar-EG", label: "اللغة العربية" },
        { value: "hi-IN", label: "हिन्दी" }
    ];

    return (
        <div className="flex items-center bg-transparent rounded border border-white/20 px-1">
            {/* Mute Button */}
            <div className="mr-1 flex items-center">
                <button
                    title={isMuted ? "Turn auto-read on (ctrl + m)" : "Turn auto-read off (ctrl + m)"}
                    onClick={() => setIsMuted(!isMuted)}
                    className="relative bg-transparent p-1 rounded-md text-white transition-colors active:opacity-80 disabled:text-gray-400 disabled:opacity-40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                    style={{ width: "24px", height: "24px" }}
                >
                    {isMuted ? (
                        <VolumeX className="w-4 h-4" />
                    ) : (
                        <Volume2 className="w-4 h-4" />
                    )}
                    {isMuted && (
                        <div className="absolute bg-red-400 w-0.5 h-4 top-1 left-2 rotate-45"></div>
                    )}
                </button>
            </div>

            {/* Language Selector */}
            <div className="flex items-center relative">
                <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="appearance-none bg-transparent text-gray-300 text-xs rounded-md pl-2 py-1 pr-4 min-w-0 w-26 focus:outline-none focus:ring-2 focus:ring-white/20 cursor-pointer hover:bg-white/10 transition-colors"
                    style={{ fontSize: "11px", textIndent: "0px" }}
                >
                    {languages.map((lang) => (
                        <option key={lang.value} value={lang.value} className="bg-gray-800 text-white">
                            {lang.label}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>

            {/* Settings Button */}
            <div className="flex items-center">
                <button
                    className="bg-transparent p-1.5 rounded-md text-white transition-colors active:opacity-80 disabled:text-gray-400 disabled:opacity-40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                    style={{ width: "28px", height: "28px" }}
                >
                    <MoreVertical className="w-2.5 h-2.5" />
                </button>
            </div>
        </div>
    );
};

export default VoiceControlsMenu;
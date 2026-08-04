import { useLanguage as useLanguageContext } from "../context/LanguageContext";

export default function useLanguage() {
    return useLanguageContext();
}

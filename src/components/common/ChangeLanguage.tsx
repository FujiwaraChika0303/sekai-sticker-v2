import { Button } from "@mantine/core";
import { useTranslation } from "react-i18next";


function ChangeLanguage(){
    const { i18n } = useTranslation(); 

    return (
        <>
        <Button onClick={() => i18n.changeLanguage('en')}>
            Change Stuff EN
        </Button>

        <Button onClick={() => i18n.changeLanguage('zh-TW')}>
            Change Stuff TW
        </Button>
        </>
    )
}
    
export default ChangeLanguage

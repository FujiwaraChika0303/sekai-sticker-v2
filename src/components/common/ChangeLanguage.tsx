import { Button } from "@mantine/core";
import { useTranslation } from "react-i18next";


function ChangeLanguage(){
    const { i18n } = useTranslation(); 

    return (
        <>
        <Button onClick={() => i18n.changeLanguage('en')}>
            Change Stuff En
        </Button>

        <Button onClick={() => i18n.changeLanguage('fr')}>
            Change Stuff FR
        </Button>
        </>
    )
}
    
export default ChangeLanguage

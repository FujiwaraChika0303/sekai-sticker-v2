import { Grid, NavLink } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";
import GeneralInformations from "./content/GeneralInformations";
import Shotcuts from "./content/Shotcuts";

const howToUseNav = ["General Informations", "Shotcuts"] as const
type HowToUseNavType = typeof howToUseNav[number]

function LearnMoreContent(){
    const [ guideLink, setGuideLink ] = useState<HowToUseNavType>("Shotcuts");

    return (
        <>
            <Grid>
                <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
                    { howToUseNav.map( v => (
                        <NavLink
                            label={v}
                            onClick={() => setGuideLink(v)}
                            rightSection={
                                <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
                            }
                        />
                    ))}
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 8, lg: 9 }}>
                    { guideLink === "Shotcuts" && <Shotcuts />}
                    { guideLink === "General Informations" && <GeneralInformations />}
                </Grid.Col>
            </Grid>
        </>
    )
}
    
export default LearnMoreContent

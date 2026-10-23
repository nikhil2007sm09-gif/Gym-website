import AboutHero from "../Components/AboutPage/AboutHero";
import OurStory from "../Components/AboutPage/OurStory";
import TasteTheDifference from "../Components/AboutPage/TasteTheDifference";
import UltimateExperience from "../Components/AboutPage/UltimateExperience";
import MasterTasterText from "../Components/AboutPage/MasterTasterText";
import AnnouncementBar from "../Components/AboutPage/AnnouncementBar";
import WhyChooseUs from "../Components/AboutPage/WhyChooseUs";
import InstagramFollow from "../Components/AboutPage/InstagramFollow";

const About = () => {
    return (
        <>
            <AboutHero />

            <TasteTheDifference />
            
            <UltimateExperience />
            <OurStory />
            <MasterTasterText />
            <WhyChooseUs />

            <AnnouncementBar />
            <InstagramFollow />
        </>
    );
};

export default About;

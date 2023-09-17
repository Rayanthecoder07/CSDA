import statcan from "../../../assets/stacan.png"
import statcsda from "../../../assets/stacsda.png"
function About(){
    return(
        <div className="p-2">
        <p className="text-2xl text-center">Tired of messy Data?</p>
        <div className="flex flex-row gap-2 items-center">
    <div className="flex-1">
        <img src={statcan} className="w-full rounded-md" alt="StatCan" />
    </div>

    <div className="flex-1">
        <p>The problem with Statistic Canada</p>
    </div>

</div>

        </div>
    )
}

export default About
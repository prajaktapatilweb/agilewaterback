import Coachingdetail from 'modules/commanmodules/Coachingdetail'
import React from 'react'

export default function Careerdetails() {
    var DetailObject = [
        {
            heading: <span> Your Career Is Your Business<br></br> It's Time For You To Manage It As A CEO'</span>,
            para: <span>It's Time For You To Manage It As A CEO Career coaching with us is not just providing you with a fresh job. Its about bringing light to what you require in a job to be truthfully joyful and come up with inconsequential so that you wont notice yourself in the work merchandise once more for a good long span.

                <br></br> <br></br>Irrespective where you are beginning, the life you desire is perfectly accessible to you, and our coaches are here to keep up all over the whole procedure. We want to be-friends with you, what's dominant to you and what makes you stroke. Equipped with that compassion, we can stand steadily in your corner and grasp you responsible to your goal because we know you can be who you want to be.</span>
        }
    ]

    return (
        <div>
            <Coachingdetail DetailObject={DetailObject}></Coachingdetail>
        </div>
    )
}

import Coachingdetail from 'modules/commanmodules/Coachingdetail'
import React from 'react'

export default function Agiledetails() {
    var DetailObject = [
        {
            heading: 'Failure Is Not Fatal But Failure To Change Might Be.',
            para: <span>The Agile Coaching track explores the mindset, stances, and skills needed for effective facilitation, coaching, mentoring, and teaching in an agile team context. More importantly, it emphasizes the self-awareness and self-management required to navigate among these stances in service of teams, and to serve as a role model of agile values and principles. The track also focuses on guiding a team's journey from startup to high-performance. The group of Agile Coaches work individually in their roles within different areas, but also together as a team with shared goals to take an organizational and long term strategic responsibility for improvements.<br></br>
                <br></br>In Agile organizations a leader is responsible only in one area. Either PEOPLE, PRODUCT, TECHNOLOGY or PROCESS. Agile coaches coach the people in all areas to improve value and flow continuously. An Agile coach is a person who is responsible for creating and improving Agile processes within a team or a company. Agile coach spread Agile best practices between different teams, integrate Agile teams within non-Agile processes and measure results of an Agile transition.
            </span>
        }
    ]

    return (
        <div>
            <Coachingdetail DetailObject={DetailObject} />

        </div>
    )
}

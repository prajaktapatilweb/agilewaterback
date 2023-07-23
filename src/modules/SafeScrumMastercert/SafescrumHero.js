import Herosection from 'modules/commanmodules/Herosection'
import React from 'react'


export default function SafescrumHero() {
    return (
        <div>
            <Herosection
                image1='/assets/images/courselogo/SSM-logo.png'
                // /assets/images/Safe/SAFe-Agilist-Logo.png'
                heading='SAFe Scrum Master Certification'
                list1={[
                    '2 Days of Classroom Training',
                    '  100% Assured Results',
                    'SAFe® 6.0 Scrum Master certificate',
                    'Trained by experienced SPC 5.0 SAFe Consultant',
                    '1 year certified membership as a SAFe Scrum Master.',
                    'Access to a variety of learning resources to support you during your SAFe journey'
                ]}
            />
        </div>
    )
}

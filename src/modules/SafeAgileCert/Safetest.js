import Testcard from 'modules/commanmodules/TestCard'
import React from 'react'

export default function Safetest() {
    return (
        <div>
            <Testcard
                img={<img src={'/assets/images/dashboard/academy/promo.png'} alt='promo' />}
                testpara=" The SAFe Certification Mock Test tool helps you to assess your preparation for the SAFe certification exams as well as gives you an idea about the relevant questions to be asked in the exam."
                testbutton=" Take Test"
            />
        </div>
    )
}

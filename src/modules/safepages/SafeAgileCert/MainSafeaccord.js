import Accordioninfo from 'modules/commanmodules/Accordianinfo'
import React from 'react'
import Safeinfo from './Safeinfo'
import Safeaccord from './Safeaccord'


export default function MainSafeaccord() {

    var DetailObject = [
        {
            heading: "FAQ :",
            para: '',
            comp: <Safeaccord />
        },
    ]
    return (



        <div>
            <Accordioninfo DetailObject={DetailObject} >

            </Accordioninfo>
        </div>
    )
}

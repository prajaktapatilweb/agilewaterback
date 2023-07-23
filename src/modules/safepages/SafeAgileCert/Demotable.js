import React from 'react'
import { Table } from '@mui/material'

export default function Demotable() {
    return (
        <>

            <div className="cards">
                <Table className="table11">
                    <thead>
                        <tr>
                            <th>Course</th>
                            <th>Date</th>
                            <th style="display:none">City</th>
                            <th>Venue</th>
                            <th>Cost- Include All</th>
                            <th>Trainer</th>
                            <th>Registration</th>

                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td data-label="Course">Scrum@Scale Online </td>
                            <td data-label="Date">8 May - 9 May 21'</td>
                            <td data-label="City" style="display:none">Online</td>
                            <td data-label="Venue">11.30 AM - 6.30 PM (IST)</td>
                            <td data-label="Cost- Include All">₹39,999</td>
                            <td data-label="Trainer">Amogh Joshi</td>
                            <td data-label="Registration"><button onclick="popup('s-s-training-certification-290920-7');" class="twbutton">Register</button><noscript id="tsNoJsMsg">Javascript on your browser is not enabled.</noscript><script src="https://www.townscript.com/popup-widget/townscript-widget.nocache.js" type="text/javascript"></script></td>
                        </tr>
                        <tr>
                            <td data-label="Course">Scrum@Scale Online </td>
                            <td data-label="Date">8 May - 9 May 21'</td>
                            <td data-label="City" style="display:none">Online</td>
                            <td data-label="Venue">6.30 AM - 01.00 PM (GMT)</td>
                            <td data-label="Price">$750</td>
                            <td data-label="Trainer">Amogh Joshi</td>
                            <td data-label="Registration"><button onclick="popup('s-s-training-certification-290920-7');" class="twbutton">Register</button><noscript id="tsNoJsMsg">Javascript on your browser is not enabled.</noscript><script src="https://www.townscript.com/popup-widget/townscript-widget.nocache.js" type="text/javascript"></script></td>
                        </tr>




                    </tbody>
                </Table>

            </div>
        </>
    )
}

import EnhancedTable from 'modules/commanmodules/EnhancedTable';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {onGetCourseList} from 'redux/actions';

export default function EditCourse() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetCourseList());
  }, [dispatch]);
  const CourseList = useSelector((state) => state?.dashboard?.courselist?.List);
  console.log('first 2225', CourseList);

  var columns = [
    {
      id: 'CourseName',
      numeric: false,
      label: 'Course',
    },
    {
      id: 'StartDate',
      numeric: false,
      label: 'Date',
    },
    {
      id: 'Place',
      numeric: false,
      label: 'City',
    },
    {
      id: 'Time',
      numeric: false,
      label: 'Time (IST)',
    },
    {
      id: 'Cost',
      numeric: true,
      label: 'Cost (INR)',
    },
    {
      id: 'Trainer',
      numeric: false,
      label: 'Trainer',
    },
    {
      id: 'action',
      numeric: false,
      label: 'Registeration',
    },
  ];

  return (
    <>
      <h1>sdsd</h1>
      {/* <EnhancedTable
            rows={rows}
            headCells={columns}
            TableTitle='Enhanced Table On Nutrition'
            mainColumn='name'
            orderByColumn='calories' /> */}
    </>
  );
}

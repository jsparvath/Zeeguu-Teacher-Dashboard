import React, { useState, useEffect } from 'react'

function compareString(a, b) {}

// We are not using the html "table" element because each row is a link.
// implementing that functionality with table is very complex, and also bad for accessibility reasons.
// Therefore an unordered list is used
export const ListTable = ({ children }) => {
  const _headItems = children.find(child => child.type.name === 'LTHead').props
    .children
  const _bodyItems = children.find(child => child.type.name === 'LTBody').props
    .children
  console.log(_headItems)
  console.log(_bodyItems)
  const [sortingInfo, setSortingInfo] = useState(null)
  const [headItems, setHeadItems] = useState(_headItems)
  const [bodyItems, setBodyItems] = useState(_bodyItems)

  useEffect(() => {
    if (sortingInfo) {
      // const sortingFunction =
      // const sorted = bodyItems.sort((a,b) =>  )
    }
  }, [sortingInfo])

  return <div>{children}</div>
}

export const LTHead = ({ children }) => {
  return <div className="ztd-student-table--header">{children}</div>
}
export const LTHeadItem = ({ children, isSortable = false }) => {
  return isSortable ? (
    <p
      className="ztd-student-table--is-sortable
      ztd-student-table--cell 
      "
      onClick={() => {
        console.log('clicked')
      }}
    >
      {children}
    </p>
  ) : (
    <p className="ztd-student-table--cell">{children}</p>
  )
}
export const LTBody = ({ children }) => {
  return <ul>{children}</ul>
}
export const LTRow = ({ children }) => {
  return (
    <li className="ztd-student-table--item">
      <a className="ztd-student-table--link" href="#">
        {children}
      </a>
    </li>
  )
}
export const LTData = ({ children }) => {
  return <div className="ztd-student-table--cell">{children}</div>
}

//  <ListTable>
//   <LTHead headItems={[{name: "NAME", isSortable: true}, {name: "TIME SPENT", isSortable: true} ]}/>
//   <LTBody bodyItems={[{name: "jonathan", timeSpent: "0", activity: "0"}]}/>
// </ListTable>

{
  /* <ListTable>
  <LTHead>
    <LTHeadItem isSortable>NAME</LTHeadItem>
    <LTHeadItem isSortable>TIME SPENT</LTHeadItem>
  </LTHead>
  <LTBody>
    <LTItem>
      <LTItemData>Jonathan</LTItemData>
      <LTItemData>0h 0m</LTItemData>
      <LTItemData>11</LTItemData>
    </LTItem>
  </LTBody>
</ListTable> */
}

// <div className="ztd-student-table--header">
//   <p>NAME</p>
//   <p>TIME SPENT</p>
//   <p>ACTIVITY</p>
// </div>
// <ul>
//   {students.map(student => {
//     return (
//       <li className="ztd-student-table--item" key={student.id}>
//         <a className="ztd-student-table--link" href="#">
//           <p>{student.name}</p>
//           <p>
//             {student.total_time / 3600}h {(student.total_time / 60) % 60}m
//           </p>
//           {/* Vj {{ ((student.exercises_done + student.reading_time)/3600)|int }} h
//                           {{ (((student.exercises_done + student.reading_time)/60)%60)|int }} m */}
//           <p>{student.learning_proportion}</p>
//         </a>
//       </li>
//     )
//   })}
// </ul>

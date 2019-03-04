import React, { useState, useEffect } from 'react'
import clsx from 'clsx'

function compareString(a, b) {}

// We are not using the html "table" element because each row is a link.
// implementing that functionality with table is very complex, and also bad for accessibility reasons.
// Therefore an unordered list is used
export const ListTable = ({ children }) => {
  const [sortingInfo, setSortingInfo] = useState({
    sortingIndex: '',
    reverse: false
  })

  const transformedChildren = React.Children.map(children, child => {
    if (child.type.name === 'LTHead') {
      return React.cloneElement(child, {
        children: child.props.children.map((headItem, index) => {
          let transformedItem = headItem.props.isSortable
            ? React.cloneElement(headItem, {
                onClick: () => {
                  const isReverse =
                    sortingInfo.sortingIndex == index
                      ? !sortingInfo.reverse
                      : false
                  setSortingInfo({
                    sortingIndex: index,
                    reverse: isReverse
                  })
                }
              })
            : headItem
          return transformedItem
        })
      })
    } else {
      return child
    }
  })

  // const _headItems = children
  //   .find(child => child.type.name === 'LTHead')
  //   .props.children.map((headItem, index) => {
  //     let transformedItem = headItem.props.isSortable
  //       ? React.cloneElement(headItem, {
  //           onClick: () => alert('bla')
  //         })
  //       : headItem
  //     // console.log(index)
  //     // console.log(headItem)
  //     return transformedItem
  //   })

  const _bodyItems = children.find(child => child.type.name === 'LTBody').props
    .children
  // console.log(_headItems)
  // console.log(_bodyItems)
  // const [headItems, setHeadItems] = useState(_headItems)
  const [bodyItems, setBodyItems] = useState(_bodyItems)

  useEffect(() => {
    console.log(sortingInfo)
    if (sortingInfo.sortingIndex || sortingInfo.sortingIndex === 0) {
      const sortedItems = [...bodyItems].sort((a, b) => {
        const sortingValueA =
          a.props.children[sortingInfo.sortingIndex].props.sortingValue
        const sortingValueB =
          b.props.children[sortingInfo.sortingIndex].props.sortingValue
        const sortingType =
          b.props.children[sortingInfo.sortingIndex].props.sortinType
        if (sortingType === 'string') {
          return sortingValueA.toLowerCase().localeCompare(b.toLowerCase())
        } else {
          return sortingValueA - sortingValueB
        }
      })
      if (sortingInfo.reverse) {
        console.log(sortedItems.reverse())
      } else {
        console.log(sortedItems)
      }
      // const sortingFunction =
      // const sorted = bodyItems.sort((a,b) =>  )
    }
  }, [sortingInfo])

  return <div>{transformedChildren}</div>
}

export const LTHead = ({ children }) => {
  return <div className="ztd-student-table--header">{children}</div>
}
export const LTHeadItem = ({
  children,
  isSortable = false,
  onClick = null
}) => (
  <p
    className={clsx('ztd-student-table--cell', {
      'ztd-student-table--is-sortable': isSortable
    })}
    onClick={onClick}
  >
    {children}
  </p>
)
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

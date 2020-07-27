import React, { useState, useRef } from 'react';

const DragNDrop = ({ data }) => {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);

  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragStart = (event, params) => {
    console.log('drag started', data);
    dragItem.current = params;
    dragNode.current = event.target;
    dragNode.current.addEventListener('dragend', handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnd = (event, params) => {
    console.log('Ending drag', data);

    dragNode.current.removeEventListener('dragend', handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;

    setDragging(false);
  };

  const handleDragEnter = (event, params) => {
    console.log('on dragEnter: ', params);
    const currentItem = dragItem.current;
    if (event.target !== dragNode.current) {
      console.log('Target is not same');
      setList();
    }
  };

  const getStyles = (params) => {
    const currentItem = dragItem.current;
    if (currentItem.grpI === params.grpI && currentItem.itemI === params.itemI) {
      return 'current dnd-item';
    }

    return 'dnd-item';
  };

  return (
    <div className="drag-n-drop">
      {list.map((grp, grpI) => (
        <div key={grp.title} className="dnd-group">
          <div className="group-title">{grp.title}</div>
          {grp.items.map((item, itemI) => (
            <div
              draggable
              key={itemI}
              className={dragging ? getStyles({ grpI, itemI }) : 'dnd-item'}
              onDragStart={(e) => handleDragStart(e, { grpI, itemI })}
              onDragEnter={
                dragging
                  ? (e) => {
                      handleDragEnter(e, { grpI, itemI });
                    }
                  : null
              }
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DragNDrop;

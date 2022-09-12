
import { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable, resetServerContext } from "react-beautiful-dnd"
import { renderToString } from 'react-dom/server';
import NoSSR from '../helpers/NoSSR'



export default function index() {
  const finalSpaceCharacters = [
    {
      id: 'gary',
      name: 'Gary Goodspeed',
      thumb: '/images/gary.png'
    },
    {
      id: 'cato',
      name: 'Little Cato',
      thumb: '/images/cato.png'
    },
    {
      id: 'kvn',
      name: 'KVN',
      thumb: '/images/kvn.png'
    },
    {
      id: 'mooncake',
      name: 'Mooncake',
      thumb: '/images/mooncake.png'
    },
    {
      id: 'quinn',
      name: 'Quinn Ergon',
      thumb: '/images/quinn.png'
    }
  ]

  const [characters, setcharacters] = useState(finalSpaceCharacters)


  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setcharacters(items);
  }


  return (
    <>
      <NoSSR>
        <div className="container mx-auto my-5">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                  {characters.map(({ id, name, thumb }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <div className="characters-thumb">
                              {thumb}
                            </div>
                            <p>
                              {name}
                            </p>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>

        </div>
      </NoSSR>
    </>
  )
}

import React from 'react'

const Header = (props) => {
    return (
        <h1>
            {props.course}
        </h1>
    )
}

const Part = ({ name, exercises }) => {
    return (
        <p>
            {name} {exercises}
        </p>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} /> )}
        </div>
    )
}

const Total = ({ parts }) => {
    const sum = parts
        .map(a => a.exercises)
        .reduce((a, b) => a + b, 0)

    return (
        <b>
            total of {sum} exercises
        </b>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course

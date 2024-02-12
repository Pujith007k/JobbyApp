import './index.css'

const SkillsItems = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails
  return (
    <li className="skillList">
      <img src={imageUrl} className="skillImage" alt={name} />
      <p className="skillParagraph">{name}</p>
    </li>
  )
}

export default SkillsItems

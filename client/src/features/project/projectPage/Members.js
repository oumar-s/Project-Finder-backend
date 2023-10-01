const Members = (props) => {
    //console.log(props.members[0].member.firstName)
    return (
        <ul>
            {props.members.map((member) => {
            console.log(member.member.firstName)
            return <li>{member.member.firstName}</li>
            
            
            })}
        </ul>
    )
}

export default Members
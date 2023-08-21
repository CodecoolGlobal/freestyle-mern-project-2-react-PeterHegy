

function ChooseAtype ({onClickType}) {
const activityTypes = ['busywork','diy','charity','cooking','education','recreational','relaxation','social','music']
//convert to object


    return (
        <div>
            {activityTypes.map((type) => (
                <button key={type} onClick={() => {onClickType(type)}}>{type}</button>
            ))}
        </div>
    )
}
export default ChooseAtype
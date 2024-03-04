export function Roll({isRolling, isWin, items, result, setSelectedItem, selectedItem}) {
    return (
        <div className={`visual_container box center_text ${isRolling ? "roll" : ""} ${isWin ? "win" : ""}`}>
            {/* Реальный контейнер */}
            <div
                className={`natural_container ${isRolling ? "roll" : ""} ${isWin ? "win" : ""}`}
            >
                {/* Предметы которые можно выбить */}
                {items?.map((item, index) => (
                        <div
                            className={`item ${item.rarity.name} ${index === result ? "result" : ""}`}
                            key={index}
                            onMouseEnter={() => selectedItem !== result && setSelectedItem(index)}
                        >
                            {item.img
                                ? <img src={item.img} alt={item.drop.displayname}/>
                                : <p>
                                    {item.drop.displayname}
                                </p>
                            }
                        </div>
                    )
                )}
            </div>
        </div>
    )
}
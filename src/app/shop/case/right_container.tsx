// База данных
import {Case, RarityCase} from "./db";

// Svg
import {MostikiSvg} from "@ui/svgs";

export function RightContainer({caseSettings, setCaseSetting, isRolling}) {
    // todo: значок i для получения инфы дропа

    return (
        <form
            className="right_container container"
        >
            <fieldset
                className="box"
                onChange={e =>
                    setCaseSetting("rarity", e.target.value)
                }
                disabled={isRolling}
            >
                <h3 className="unic_color heading center_text">Тип кейса</h3>
                {
                    RarityCase.map((type) => (
                        <label key={type.name} className="select_item no_select">
                            <input
                                type="radio" value={type.name} name="select_case" className="select_input"
                                defaultChecked={caseSettings.current.rarity === type.name}
                            />
                            {type.displayname}
                            <p className="mostiki_text unic_color">
                                {type.price} <MostikiSvg/>
                            </p>
                        </label>
                    ))
                }
            </fieldset>

            <fieldset
                className="box"
                onChange={e =>
                    setCaseSetting("type", e.target.value)
                }
                disabled={isRolling}
            >
                <h3 className="unic_color heading center_text">Тип дропа</h3>
                <label className="select_item no_select">
                    <input
                        type="radio" value="all" name="select_drop" className="select_input"
                        defaultChecked={caseSettings.current.type === "all"}
                    />
                    Весь дроп
                    <p className="mostiki_text unic_color">
                        0 <MostikiSvg/>
                    </p>
                </label>
                {
                    Case.map((type) => (
                        <label key={type.name} className="select_item no_select">
                            <input
                                type="radio" value={type.name} name="select_drop"
                                defaultChecked={caseSettings.current.type === type.name}
                                className="select_input"
                            />
                            {type.displayname}
                            <p className="mostiki_text unic_color">
                                {type.price} <MostikiSvg/>
                            </p>
                        </label>
                    ))
                }
            </fieldset>
        </form>
    )
}
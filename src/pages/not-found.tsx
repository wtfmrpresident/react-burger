import notFoundStyles from './not-found.module.css'
import notFoundImage from '../images/not-found.png'
import { Link } from "react-router-dom";

export function NotFoundPage() {
    return (
        <div className={notFoundStyles.container}>
            <div className={`${notFoundStyles.main} mt-30`}>
                <img className={notFoundStyles.img} src={notFoundImage} alt="Страница не найдена" />
                <p className={`${notFoundStyles.error_text} text text_type_main-large`}>404</p>
                <p className="text text_type_main-default">Ну и забрел же ты...</p>
                <p className="text text_type_main-default">
                    <Link to="/">
                        Пока ищешь - перекуси &#127828;
                    </Link>
                </p>
            </div>
        </div>
    )
}

import preloader from './preloader.svg'
import React from "react";
import classes from './Preloader.module.css'


let Preloader = () => {
    return (
        <div>
            <img className={classes.preloader} src={preloader} alt=''/>
        </div>
    )
}

export default Preloader;
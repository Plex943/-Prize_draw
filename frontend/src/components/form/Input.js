import styles from "./Input.module.css"

function Input({ 
    type,
    text,
    name,
    placeholder,
    handleChange,
    value,
    multiple}) {

        return(
            <div className={styles.form_control} >
                <label htmlFor={name} >{text}: </label>
                <input 
                id={name} 
                type={type} 
                name={name} 
                value={value}
                placeholder={placeholder} 
                onChange={handleChange}
                {...multiple ? {multiple} : ""}/>
            </div>
        ) 
}

export default Input
import s from "@/sass/layouts/header.module.scss";

const Header = () => {
  return (
    <header className={s.header}>
      <div className={`${s.container}  ${s.container__header}  `}>
        <h1>Header</h1>
      </div>
    </header>
  );
};

export default Header;

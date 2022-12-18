import './navHeader.css'
interface INav {
  styleNav: string
}
export function NavHeader({styleNav} : INav) {
  
  return (
    <nav className={`navigation ${styleNav}`}>
      <ul className="header__nav">
        <li>Техника</li>
        <li>Одежда</li>
        <li>Косметика</li>
        <li>Для животных</li>
        <li>Мебель</li>
      </ul>
    </nav>
  )
}

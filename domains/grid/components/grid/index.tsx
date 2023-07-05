import clsx from 'clsx';
import styles from './grid.module.scss';
function Grid(props: React.ComponentProps<'ul'>) {
  return (
    <ul {...props} className={clsx(styles.grid, props.className)}>
      {props.children}
    </ul>
  );
}

function GridItem(props: React.ComponentProps<'li'>) {
  return (
    <li {...props} className={clsx(props.className)}>
      <div>{props?.children}</div>
    </li>
  );
}

Grid.Item = GridItem;
export default Grid;

import "./style.css";

function Item({ name, total, und, value, ...props }) {
  return (
    <div id="container-item" {...props}>
      <div style={{ pointerEvents: "none" }}>
        <h2 style={{ fontWeight: '600' }}>{name}</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right', pointerEvents: "none"}}>
        <h3 style={{ fontSize: '1.7rem', fontWeight: '600' }}>
            R$ {total}
        </h3>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '-10px' }}>
            {und}UND R$ {value}
        </h3>
      </div>
    </div>
  );
}

export default Item;

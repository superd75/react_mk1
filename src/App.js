import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function Header(props){
  return(
    <header className='header'>
      <h1>
        <a href='#' onClick={function(e){
          e.preventDefault();
          props.ChangMode();
        }}>{props.tit}</a>
      </h1>
    </header>
  )
}


function Nav(props)
{
  let nav_ls_arry = [];
  for(let i=0; i<props.nav.length; i++)
  {
    let t = props.nav[i];  
    nav_ls_arry.push(<li key={t.id}>
      <a href='#' id={t.id} onClick={function(e){
        e.preventDefault();
        props.ChangMode( Number(e.target.id));
      }}>{t.tit}</a>
    </li>);
  }
  
  return(
    <ol className='nav'>
      {nav_ls_arry}
    </ol>
  )
}


function Article(props)
{
  return(
    <div className='content_area'>
      <h2>{props.tit}</h2>
      <p>{props.bdy}</p>
    </div>
  )
}


function Create(props)
{
    return(
      <div className ="form_area">
        <form onSubmit={ function(e){
              e.preventDefault();
              let tit_v = e.target.tit.value;
              let txt_v = e.target.txt.value;
              props.CreateMode ( tit_v, txt_v );
          }}>
          <p><input type="text" name="tit" placeholder="페이지명"></input></p>
          <p><textarea name="txt" placeholder="페이지 설명"></textarea></p>
          <p><input type="submit" value="Create" className="btn_submit"></input></p>
        </form>
      </div>
    )
}


function Update(props)
{
    let [mode_tit, setMode_tit] = useState(props.tit);
    let [mode_txt, setMode_txt] = useState(props.txt);
    return(
      <div className ="form_area">
        <form onSubmit={ function(e){
              e.preventDefault();
              let tit_v = e.target.tit.value;
              let txt_v = e.target.txt.value;
              props.UpdateMode ( tit_v, txt_v );
              
          }}>
          <p><input type="text" name="tit" placeholder="페이지명" value={mode_tit} onChange={ function(e){
              setMode_tit(e.target.value);
          }}></input></p>
          <p><textarea name="txt" placeholder="페이지 설명" value={mode_txt} onChange={ function(e){
              setMode_txt(e.target.value);
          }}></textarea></p>
          <p><input type="submit" value="Update" className="btn_submit"></input></p>
        </form>
      </div>
    )
}


function App() {
  let [mode_pg, setMode_pg] = useState("Mpg");
  let [mode_nav, setMode_nav] = useState(null);
  let [mode_nav_id, setMode_nav_id] = useState(4);
  let [nav_ls, setMode_nav_ls] = useState([
    { id:1, tit:'HTML', txt:'html is...Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias temporibus eos aliquam placeat quibusdam est praesentium qui! Tempore, deserunt voluptatum sint unde laudantium necessitatibus fuga quasi eos harum aliquam facere!'},
    { id:2, tit:'CSS', txt:'css is ...Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quas, sint quam corrupti, nobis nisi ad ab soluta nemo reiciendis eius temporibus? Cupiditate eaque aut ipsum, veniam sapiente incidunt? Deleniti!'},
    { id:3, tit:'JS', txt:'js is ...Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque dicta ex mollitia doloremque! Magni, perspiciatis? Aut, similique! Dicta totam deserunt reiciendis ipsam architecto harum quo eligendi, saepe soluta, ullam perspiciatis?'}
  ]);

  let Header_tit = null;
  let content_area = null;
  let btn_area = null;
  
  //Btn_Create 버튼생성.
  let btn_create = <a href='/create/' className='btn' onClick={function(e){
                        e.preventDefault();    
                        setMode_pg("Cpg");
                    }}>Create</a>

  let btn_update = <a href='/update/' className='btn' onClick={ function(e){
                        e.preventDefault();
                        setMode_pg("Upg");
                    }}>Update</a>

  let btn_delete = <button type="button" className="btn" onClick={function(){
                        let nav_ls_new = [];
                        //console.log('check1', mode_nav);
                        for(let i=0; i<nav_ls.length; i++)
                        {
                            if( nav_ls[i].id !== mode_nav )
                            {
                               nav_ls_new.push(nav_ls[i]);
                            }
                        }
                        setMode_nav_ls(nav_ls_new);
                        setMode_pg("Mpg");
                    }}>Delete</button>


  if( mode_pg === "Mpg" )
  {
      Header_tit = 'WEB';
      content_area = <Article tit='web' bdy='web is ...'></Article>
      btn_area = <div className='btn_area'>
                    {btn_create}
                  </div>; 
  }
  else if( mode_pg === "Spg")
  {
      for(let i=0; i<nav_ls.length; i++)
      {
          if( nav_ls[i].id === mode_nav )
          {
              Header_tit = "WEB"+" > "+nav_ls[i].tit;
              content_area = <Article tit={nav_ls[i].tit} bdy={nav_ls[i].txt}></Article>
          }
      }
      btn_area = <div className='btn_area'>
                    {btn_create} {btn_update} {btn_delete}
                  </div>; 
  }
  else if( mode_pg === "Cpg")
  {
      Header_tit = "WEB"+" > Create";
      content_area = <Create CreateMode={function(tit_v, txt_v){
          let nav_ls_val = {id:mode_nav_id, tit:tit_v, txt:txt_v};
          let nav_ls_new = [...nav_ls];
          nav_ls_new.push(nav_ls_val);
          setMode_nav_ls(nav_ls_new);
          setMode_pg("Spg");
          setMode_nav(mode_nav_id);
          setMode_nav_id(mode_nav_id+1);
      }}></Create>
  }
  else if( mode_pg === "Upg")
  {
      for(let i=0; i<nav_ls.length; i++)
      {
          if( nav_ls[i].id === mode_nav )
          {
              const tit_val = nav_ls[i].tit;
              const txt_val = nav_ls[i].txt;
              
              Header_tit = "WEB"+" > "+ tit_val;
              content_area = <Update tit={tit_val} txt={txt_val} UpdateMode={function(tit_v, txt_v){
                  let nav_ls_new = [...nav_ls];
                  nav_ls_new[i] = {id:mode_nav, tit:tit_v, txt:txt_v};
                  
                  setMode_nav_ls(nav_ls_new);
                  setMode_pg("Spg");
                  setMode_nav(mode_nav);
                  //console.log(mode_nav_id, tit_v, txt_v);
                  //console.log( nav_ls_val );
            }}></Update>
          }
      }
  }

  return (
    <div>
      <Header tit={Header_tit} ChangMode={function(){
        setMode_pg('Mpg');
      }}></Header>

      <Nav nav={nav_ls} ChangMode={function(id){
         setMode_pg('Spg');
         setMode_nav(id);
      }}></Nav>

      {content_area}
      {btn_area}
    </div>
  )
}

export default App;

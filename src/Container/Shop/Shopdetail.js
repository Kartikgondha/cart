import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../redux/action/Product.action';

function Shopdetail(props) {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);
    const productData = product.product;


    useEffect(() => {
        dispatch(getProduct());
      }, []);

    const id = props.location.state;
    const FData = productData.filter((d)=>d.id === id.id);
   
    return (
        <div>
            <section className="sec-product-detail bg0 p-t-65 p-b-60">
                <div className="container">
                    <div className="row">
                        {FData.map((f)=>{
                            return(
                                <>
                                <div className="col-md-6 col-lg-7 p-b-30">
                                <div className="p-l-25 p-r-30 p-lr-0-lg">
                                    <div className="wrap-slick3 flex-sb flex-w">
                                        <div className="wrap-slick3-dots" />
                                        <div className="wrap-slick3-arrows flex-sb-m flex-w" />
                                        <div className="slick3 gallery-lb">
                                            <div className="item-slick3" data-thumb="images/product-detail-01.jpg">
                                                <div className="wrap-pic-w pos-relative">
                                                    <img src={f.product_img} alt="IMG-PRODUCT" />
                                                    
                                                </div>
                                            </div>
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-5 p-b-30">
                                <div className="p-r-50 p-t-5 p-lr-0-lg">
                                    <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                                       {f.name}
                                    </h4>
                                    <span className="mtext-106 cl2">
                                        {f.price}
                                    </span>
                                    <p className="stext-102 cl3 p-t-23">
                                        Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.
                                    </p>
                                   
                                    <div className="p-t-33">
                                      
                                       
                                        <div className="flex-w flex-r-m p-b-10">
                                            <div className="size-204 flex-w flex-m respon6-next">
                                                <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                                                    <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                                                        <i className="fs-16 zmdi zmdi-minus" />
                                                    </div>
                                                    <input className="mtext-104 cl3 txt-center num-product" type="number" name="num-product" defaultValue={1} />
                                                    <div className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                                                        <i className="fs-16 zmdi zmdi-plus" />
                                                    </div>
                                                </div>
                                                <button className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail">
                                                    Add to cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                    
                   
                                </div>
                            </div>
                            </>
                            )
                        })}
                       
                    </div>
                  
                </div>
              
            </section>
          
        </div>

    );
}

export default Shopdetail;
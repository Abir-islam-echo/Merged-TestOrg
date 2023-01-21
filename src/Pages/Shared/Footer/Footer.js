import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {

    return (
        <div>
            <div className='w-100  bg-gray-100 footer-body'>
                <footer className="new_footer_area bg_color">
                    <div className="new_footer_top pt-0:important">
                        <div className="container content-center m-auto">
                            <div className="w-100 flex justify-between flex-wrap gap-20 f-content">
                                <div className="col-lg-4 w-100 fsc">
                                    <div className="f_widget company_widget wow fadeInLeft" data-wow-delay="0.2s" style={{ visibility: "visible", animationDelay: 0.2, animationName: "fadeInLeft" }} >
                                        <h3 className="f-title f_600 t_color f_size_18">Get in Touch</h3>
                                        <p className=''>Don't miss any updates of our new templates and extensions.!</p>
                                        <div className="w-100 f_subscribe_two mailchimp">
                                            <input type="email" name="EMAIL" className="form-control memail  p-3 border-cyan-600 border-2 bg-transparent  rounded-lg w-full h-10 outline-none text-gray-700" placeholder="Email"></input>
                                            <button className="btn btn_get btn_get_two font-bold py-2 px-4 rounded-full bg-indigo-800" type="submit">Subscribe</button>
                                            <p className="mchimp-errmessage" style={{ display: "none" }}></p>
                                            <p className="mchimp-sucmessage" style={{ display: " none" }}></p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-md-6 fsc">
                                    <div className="f_widget about-widget pl_70 wow fadeInLeft" data-wow-delay="0.6s" style={{ visibility: "visible", animationDelay: 0.6, animationName: "fadeInLeft" }}>
                                        <h3 className="f-title f_600 t_color f_size_18">Help</h3>
                                        <ul className="list-unstyled f_list">
                                            <li><Link to="#">FAQ</Link></li>
                                            <li><Link to="#">Documentation</Link></li>
                                            <li><Link to="#">Support Policy</Link></li>
                                            <li><Link to="#">Privacy</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 flex justify-center fsc">
                                    <div className="f_widget social-widget pl_70 wow fadeInLeft" data-wow-delay="0.8s" style={{ visibility: "visible", animationDelay: 0.8, animationName: "fadeInLeft" }}>
                                        <h3 className="f-title f_600 t_color f_size_18 mb-2">Team Solutions</h3>
                                        <div className="f_social_icon flex gap-5 ">
                                            <Link to="#" className="fab fa-facebook"></Link>
                                            <Link to="#" className="fab fa-twitter"></Link>
                                            <Link to="#" className="fab fa-linkedin"></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer_bg">
                            <div className="footer_bg_one"></div>
                            <div className="footer_bg_two"></div>
                        </div>
                    </div>
                    <div className="footer_bottom bg-indigo-100">
                        <div className="container m-auto">
                            <p className="mb-0 mt-4 f_400 align-center text-lg text-stone-700 font-semibold">© TestOrg. 2023 All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>

        </div>

    );
};



export default Footer;


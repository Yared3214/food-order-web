"use client"
import GlobalApi from "@/app/_utils/GlobalApi";
import {
    Body,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
  } from "@react-email/components";
import Image from "next/image";
import React, { useEffect, useLayoutEffect } from 'react'; 
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
  
  export function FoodOrderEmail() {
    const getOrders = () => {
        GlobalApi.getOrders().then(resp=>{
            console.log(resp)
        })
    }
  return (
    <body>
        <div style={{
          backgroundColor: "white", 
          padding: '20px', 
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "500px",
          margin: "40px auto",
          fontFamily: "Arial, sans-serif"
          }}>
            <h1 style={{
              color: "#F97316", /* Orange */
              fontSize: "30px",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "16px",
            }}>Food Order Confirmation</h1>
            <div style={{
              borderTop: "1px solid #E5E7EB",
              borderBottom: "1px solid #E5E7EB"
            }}>
            <h2 style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "8px",
            }}>Thank you for your order!</h2>
            <p style={{
              textAlign: "center",
              marginBottom: "20px",
            }}>Your order has been confirmed and will be delivered shortly.</p>
            
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #E5E7EB",
              borderRadius: "10px",
              marginBottom: "20px",
            }} class="order-table">
                <thead style={{backgroundColor: "#F6F6F6"}}>
                    <tr>
                        <th style={{
                          borderBottom: "1px solid #E5E7EB", /* Light gray */
                          padding: "8px",
                          textAlign: "left",
                          fontWeight: "bold"
                        }}>Item</th>
                        <th style={{
                          borderBottom: "1px solid #E5E7EB", /* Light gray */
                          padding: "8px",
                          textAlign: "left",
                          fontWeight: "bold"
                        }}>Quantity</th>
                        <th style={{
                          borderBottom: "1px solid #E5E7EB", /* Light gray */
                          padding: "8px",
                          textAlign: "left",
                          fontWeight: "bold"
                        }}>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{
                          borderBottom: "1px solid #E5E7EB", /* Light gray */
                          padding: "8px",
                          textAlign: "left",
                        }}>Chicken Burger</td>
                        <td style={{
                          borderBottom: "1px solid #E5E7EB", /* Light gray */
                          padding: "8px",
                          textAlign: "left",
                        }}>2</td>
                        <td style={{
                          borderBottom: "1px solid #E5E7EB", /* Light gray */
                          padding: "8px",
                          textAlign: "left",
                        }}>$10.00</td>
                    </tr>
                    <tr>
                        <td style={{
                          borderBottom: "1px solid #E5E7EB", /* Light gray */
                          padding: "8px",
                          textAlign: "left",
                        }}>Pizza Margherita</td>
                        <td style={{
                          borderBottom: "1px solid #E5E7EB", /* Light gray */
                          padding: "8px",
                          textAlign: "left",
                        }}>1</td>
                        <td style={{
                          borderBottom: "1px solid #E5E7EB", /* Light gray */
                          padding: "8px",
                          textAlign: "left",
                        }}>$12.00</td>
                    </tr>
                </tbody>
            </table>
    
            <p style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "18px",
              marginBottom: "20px",
            }}>Total: $22.00</p>
    
            <div>
                <h3 style={{
                  textAlign: "center",
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}>Delivery Information</h3>
                <p style={{
                  textAlign: "center",
                   margin: "0",
                   marginBottom: "4px",
                }}>Address: 123 Main St, City, State, ZIP</p>
                <p style={{
                  textAlign: "center",
                   margin: "0",
                   marginBottom: "35px",
                }}  >Contact: (123) 456-7890</p>
            </div>
            </div>
            <p style={{
              textAlign: "center",
              color: "#6B7280", /* Dark gray */
              fontSize: "14px",
              marginBottom: "8px",
            }}>Thank you for choosing our service!</p>
            <p style={{
              textAlign: "center",
              color: "#6B7280", /* Dark gray */
              fontSize: "14px",
              marginBottom: "8px",
            }}>For any inquiries, please contact us at <span style={{color: "#1D4ED8"}}>support@example.com</span>.</p>
        </div>
    </body>
      );} 
  
  
  export default FoodOrderEmail;
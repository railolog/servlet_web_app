package railolog.web.lab2;

import java.io.*;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

@WebServlet(name = "controlServlet")
public class ControlServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setContentType("text/html");
        response.setCharacterEncoding("UTF-8");
        request.setCharacterEncoding("UTF-8");

        String param = request.getParameter("getTable");

        if (param != null && param.equals("true")) {
            request.getRequestDispatcher("table.jsp").forward(request, response);
        } else {
            request.getRequestDispatcher("form.jsp").forward(request, response);
        }
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        request.getRequestDispatcher("area-check").forward(request, response);
    }

    public void destroy() {
    }
}
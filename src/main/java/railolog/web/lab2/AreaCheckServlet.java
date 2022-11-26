package railolog.web.lab2;

import railolog.web.lab2.utils.Dot;
import railolog.web.lab2.utils.DotsManager;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "areaCheckServlet")
public class AreaCheckServlet extends HttpServlet {
    public void doPost (HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setContentType("text/html");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        if (request.getSession().getAttribute("dotsManager") == null){
            request.getSession().setAttribute("dotsManager", new DotsManager());
        }

        double x, y, r;
        Dot dot = null;

        try {
            x = Double.parseDouble(request.getParameter("x"));
            r = Double.parseDouble(request.getParameter("r"));
            y = Double.parseDouble(request.getParameter("y"));

            dot = new Dot(x, y, r);
        } catch (NullPointerException | NumberFormatException ignored) {}

        DotsManager dotsManager = (DotsManager) request.getSession().getAttribute("dotsManager");
        dotsManager.insert(dot);

        request.getRequestDispatcher("table.jsp").forward(request, response);
    }
}
